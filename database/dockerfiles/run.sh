
while ! pg_isready -t 5; do
	sleep 1;
done

postgraphql     -c postgres://origin_postgraphql:allegro1234@origingg.cjdraitfnk0j.us-east-1.rds.amazonaws.com:5432/originGG     -s origin     --port 5000       --default-role origin_anonymous     --jwt-secret bbo9Q4jsIkfQ1gkpolQAKLXO4WZ-s3SEcvo3gHwfxCEM_IBSisDWzlwcmDKjVfH0     --token origin.jwt_token     -o
