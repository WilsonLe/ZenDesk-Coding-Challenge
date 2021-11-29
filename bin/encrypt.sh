#! /bin/sh

# directory are relative to root, which is where "yarn encrypt" should be executed
FRONTEND_OUTPUT=./frontend/src/secrets.gpg
FRONTEND_INPUT=./frontend/src/secrets.json
gpg --quiet --batch --yes --symmetric --cipher-algo AES256 --output "$FRONTEND_OUTPUT" --passphrase "$FRONTEND_SECRETS_PASSPHRASE" "$FRONTEND_INPUT"

# directory are relative to root, which is where "yarn encrypt" should be executed
FUNCTIONS_OUTPUT=./functions/src/secrets.gpg
FUNCTIONS_INPUT=./functions/src/secrets.json
gpg --quiet --batch --yes --symmetric --cipher-algo AES256 --output "$FUNCTIONS_OUTPUT" --passphrase "$FUNCTIONS_SECRETS_PASSPHRASE" "$FUNCTIONS_INPUT"