source /home/env/env/bin/activate
sudo service postgresql start
python3 /home/env/ssl/esign/manage.py runserver 127.0.0.1:80
