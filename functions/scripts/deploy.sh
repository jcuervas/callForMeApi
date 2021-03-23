echo $PWD
environment=$1
if [ $environment == 'dev' ]; then
  projectId="callforme-2020"
elif [ $environment == 'prod' ]; then
  projectId="call-for-me-9b527"
fi

firebase use "$environment"
npm run build
pythonDir=/c/Users/javie/.pyenv/pyenv-win/versions/3.8.2/python
CLOUDSDK_PYTHON=$pythonDir gcloud config set project $projectId
CLOUDSDK_PYTHON=$pythonDir gcloud functions deploy app --env-vars-file=env.$environment.yaml
CLOUDSDK_PYTHON=$pythonDir gcloud functions deploy callChecker --env-vars-file=env.$environment.yaml

firebase deploy --only storage,hosting:"$1"
