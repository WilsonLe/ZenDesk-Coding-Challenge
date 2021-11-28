#! /bin/sh

# directory are relative to root, which is where "yarn decrypt" should be executed
FRONTEND_INPUT=./frontend/src/secrets.gpg
FRONTEND_OUTPUT=./frontend/src/secrets.json
gpg --quiet --batch --yes --decrypt --passphrase "$FRONTEND_SECRETS_PASSPHRASE" --output "$FRONTEND_OUTPUT" "$FRONTEND_INPUT"

# directory are relative to root, which is where "yarn decrypt" should be executed
FUNCTIONS_INPUT=./functions/src/secrets.gpg
FUNCTIONS_OUTPUT=./functions/src/secrets.json
gpg --quiet --batch --yes --decrypt --passphrase "$FUNCTIONS_SECRETS_PASSPHRASE" --output "$FUNCTIONS_OUTPUT" "$FUNCTIONS_INPUT"