environment=$1
firebase use "$environment"
firebase functions:config:set config.environment="$environment"
firebase functions:config:set plivo.auth_id="MAYZFLYTYYMTGXZDC5MT" plivo.auth_token="YTU1M2QyMzg3YjQzZjU2MzdiZWRhOGMyY2RkZTkx"
firebase functions:config:set api.apikey="$%&Weprot17=?call4me@" api.cipher_password="3zTvzr3p67VC61jmV54rIYu1545x4TlY"

if [ "$environment" = 'dev' ]
then
  host="vps-d88e0881.vps.ovh.net"
  port=3306
  name="call_for_me_dev"
  user="dev_callforme"
  password="%&Weprot=?call4me"
  stripe_api_key="sk_test_GbNAtH7WvwdZLiP0PdMwiRl6"
elif [ "$environment" = 'prod' ]
then
  host="vps-d88e0881.vps.ovh.net"
  port=3306
  name="call_for_me"
  user="root_callforme"
  password="%&Weprot=?call4me"
  stripe_api_key="sk_live_cWuH7FHD6CR1sCWgZGc1koyt"
fi

firebase functions:config:set ddbb.host=$host
firebase functions:config:set ddbb.port=$port
firebase functions:config:set ddbb.name=$name
firebase functions:config:set ddbb.user=$user
firebase functions:config:set ddbb.password=$password
firebase functions:config:set stripe.apikey=$stripe_api_key

firebase deploy --only functions:app,storage,hosting:"$1"
