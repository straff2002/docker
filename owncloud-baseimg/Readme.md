Usage
=====

Build
-----

```
docker build -t oc-baseimg .
```

Run
---

```
docker run -dv <host-path>:/data-vol --name data-vol data-vol 

docker run -dp 80:80 --volumes-from data-vol oc-baseimg
```