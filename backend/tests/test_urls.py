import unittest

from django.test import TestCase
from django.urls import URLPattern, URLResolver

from backend import settings

urlconf = __import__(settings.ROOT_URLCONF, {}, {}, [''])


class UrlTests(TestCase):

    def test_urls(self):
        def list_urls(lis, acc=None):
            if acc is None:
                acc = []
            if not lis:
                return
            l = lis[0]
            if isinstance(l, URLPattern):
                yield acc + [str(l.pattern)]
            elif isinstance(l, URLResolver):
                yield from list_urls(l.url_patterns, acc + [str(l.pattern)])
            yield from list_urls(lis[1:], acc)

        available_urls = [''.join(p) for p in list_urls(urlconf.urlpatterns)]
        expected_urls = ['auth/^user/$']
        for url in expected_urls:
            self.assertIn(url, available_urls)


if __name__ == '__main__':
    unittest.main()
