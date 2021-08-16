echo $PWD
environment=$1
if [ $environment == 'dev' ]; then
  projectId="callforme-2020"
elif [ $environment == 'prod' ]; then
  projectId="call-for-me-9b527"
fi

firebase use "$environment"
npm run build
gcloud config set project $projectId
gcloud functions deploy app --env-vars-file=env."$environment".yaml
gcloud functions deploy callChecker --env-vars-file=env."$environment".yaml

firebase deploy --only storage,hosting:"$1"
