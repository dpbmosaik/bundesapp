#!/usr/bin/env bash
SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
datamodel-codegen  --input ${SCRIPT_DIR}/../data/api_definition.schema --output ${SCRIPT_DIR}/../authentication/api_models.py   --enum-field-as-literal=all --validation