Usage
=====

Build
-----

```
docker build -t owncloud-deb .
```

Run
---

```
docker run -dv <host-path>:/data-vol --name data-vol data-vol 

docker run -dp 80:80 --volumes-from data-vol owncloud-deb
```