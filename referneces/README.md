#Docker Images for Scalable ownCloud
##Build

```
docker build -t databox databox/
docker build -t mysqlbox mysqlbox/
docker build -t apachebox apachebox/
```

##Run

TODO: exact run syntax for scaling
```
docker run databox 
docker run mysqlbox
docker run -d --name="apache" -p 3022:22 --volumes-from= --volume= apachebox
```

## Monitoring

### SSH Connection

boot2docker needs a portforward 3022 --> 3022
Put your public ssh key into admin_key.pub and rebuild the images.

```
docker run -d --name="apache" -p 3022:22 apachebox
ssh root@127.0.0.1 -p3022
```



## Scaling
