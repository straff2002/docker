docker
======
https://coreos.com/blog/Running-etcd-in-Containers/

export PUBLIC_IP=127.0.0.1
docker run -d -p 8001:8001 -p 5001:5001 coreos/etcd -peer-addr ${PUBLIC_IP}:8001 -addr ${PUBLIC_IP}:5001 -name etcd-node1
docker run -d -p 8002:8002 -p 5002:5002 coreos/etcd -peer-addr ${PUBLIC_IP}:8002 -addr ${PUBLIC_IP}:5002 -name etcd-node2 -peers ${PUBLIC_IP}:8001,${PUBLIC_IP}:8002,${PUBLIC_IP}:8003

curl -L 127.0.0.1:5001/v2/stats/leader

docker run -d --name etcd coreos/etcd 



https://registry.hub.docker.com/u/bobtfish/synapse-etcd-amb/
docker run -d -e SYNAPSE_APP=testservice -e SYNAPSE_PORT=8000 --link etcd:etcd --name testservice-amb bobtfish/synapse-etcd-amb
docker run -d --link testservice-amb:testservice you/your_app


docker run -d you/testservice --expose 8080 --name testservice1
docker run -d -e NERVE_SERVICE=testservice --link etcd:etcd --link testservice1:testservice1 --name testservice-registration bobtfish/nerve-etcd


Service Registry with Synapse
-----------------------------

Add the following line to ```/etc/default/docker``` to enable Docker API on tcp
```
DOCKER_OPTS="-H 127.0.0.1:4243"
```

```
sudo service docker.io restart
export DOCKER_HOST=tcp://127.0.0.1:4243
```

```
sudo apt-get install build-essential ruby ruby-dev haproxy
sudo gem install synapse
```

Edit ```/etc/default/haproxy``` to set ENABLED to 1

```
sudo service haproxy start
```

```
sudo synapse -c synapse.json.conf
```




---

Run etcd from coreos

```
docker run -d --name etcd -p 4001:4001 -p 7001:7001 coreos/etcd
```

```
docker run -d --net host --name docker-discover -e ETCD_HOST=1.2.3.4:4001 -p 127.0.0.1:1936:1936 -t jwilder/docker-discovery
```

haproxy running on http://localhost:1936