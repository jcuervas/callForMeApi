firebase use "$1"
echo $PWD
firebase functions:config:set config.environment="$1"
firebase deploy --only functions,storage,hosting:"$1"
