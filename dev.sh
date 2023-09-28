#!/bin/sh
docker compose -f compose.yaml -f compose.dev.yaml up client --build -v