from keycloak import KeycloakAdmin, URL_ADMIN_USERS, raise_error_from_response, KeycloakGetError, \
    URL_ADMIN_GROUP_MEMBERS


class ExtendedKeyCloakAdmin(KeycloakAdmin):
    def get_group_members_by_attribute(self, group_id, query=None, query_attr={}):
        """
        Return a list of group members, filtered according to query parameters and attr

        Attr comparison is done in LOWERCASE!!!

        UserRepresentation
        https://www.keycloak.org/docs-api/8.0/rest-api/index.html#_userrepresentation

        :param query: Query parameters (optional)
        :return: users list
        """
        params_path = {"realm-name": self.realm_name, "id": group_id}
        users = self.__fetch_all(URL_ADMIN_GROUP_MEMBERS.format(**params_path), query)
        return self.filter_by_attribute(users, query_attr)

    def filter_by_attribute(self, users, query_attr):
        """
        Filter a list of users by a attribute dict
        :param users:
        :param query_attr: dict with attributes {"key": search_value}
        :return: Filtered user list
        """
        filtered_users = []
        for user in users:
            match = True
            if "attributes" in user:
                for attr_key, value in query_attr.items():
                    if attr_key not in user['attributes'].keys():
                        match = False
                    elif user['attributes'][attr_key][0].lower() != str(value).lower():
                        match = False
            else:
                match = False
            if match:
                filtered_users.append(user)
        return  filtered_users

    def get_users_by_attribute(self, query=None, query_attr=None):
        """
        Return a list of users, filtered according to query parameters and attr

        Attr comparison is done in LOWERCASE!!!

        UserRepresentation
        https://www.keycloak.org/docs-api/8.0/rest-api/index.html#_userrepresentation

        :param query: Query parameters (optional)
        :return: users list
        """
        params_path = {"realm-name": self.realm_name}
        path = URL_ADMIN_USERS.format(**params_path)

        if query_attr:
            if not query:
                query = {}
            query_attr_str = ' '.join(f'{key}:{value}' for key,value in query_attr.items())
            query["q"] = query_attr_str

        users = self.__fetch_all(path, query)

        return users

    def __fetch_all(self, url, query=None):
        '''Wrapper function to paginate GET requests

        :param url: The url on which the query is executed
        :param query: Existing query parameters (optional)

        :return: Combined results of paginated queries
        '''
        results = []

        # initalize query if it was called with None
        if not query:
            query = {}
        page = 0
        query['max'] = self.PAGE_SIZE

        # fetch until we can
        while True:
            query['first'] = page*self.PAGE_SIZE
            partial_results = raise_error_from_response(
                self.raw_get(url, **query),
                KeycloakGetError)
            if not partial_results:
                break
            results.extend(partial_results)
            page += 1
        return results

    def get_all_subgroups(self, group):
        """
        Utility function to iterate through nested group structures and return all group ids

        GroupRepresentation
        https://www.keycloak.org/docs-api/8.0/rest-api/#_grouprepresentation

        :param name: group (GroupRepresentation)

        :return: list of all recursive subgroup ids
        """

        groups = []
        for subgroup in group["subGroups"]:
            groups.extend(self.get_all_subgroups(subgroup))
        groups.append(group["id"])
        return groups
