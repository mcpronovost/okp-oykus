#!/bin/bash

# Get the IP address of the container
BACKEND_HOSTNAME=$(getent hosts backend | awk '{ print $1 }')

# Set the IP address as an environment variable
export BACKEND_IP="$BACKEND_HOSTNAME"

# Execute the command provided as arguments
exec "$@"