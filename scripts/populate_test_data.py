#

# Reads some sample files and calls the server to feed with API-records

from urllib3 import PoolManager, HTTPSConnectionPool
import os
import requests

print('Starting testing data populator...')

SOURCE_FOLDER = '../samples'
BASE_URL = 'http://localhost:8080/agent'

import http.client as http_client
http_client.HTTPConnection.debuglevel = 1

import logging
# You must initialize logging, otherwise you'll not see debug output.
logging.basicConfig()
logging.getLogger().setLevel(logging.DEBUG)
requests_log = logging.getLogger("requests.packages.urllib3")
requests_log.setLevel(logging.DEBUG)
requests_log.propagate = True


def postApiRecord(apiName: str, ns: str, vs: str, apiUrl: str, content):
    print('post %s' % apiName)

    r = requests.put(BASE_URL + '/%s/%s' % (ns, apiName),
                     headers={
                         'Content-Type': "multipart/form-data"
                     },
                     data={
                         'version': vs,
                         'url': apiUrl,
                     },
                     files={
                         'file': (content, 'application-type')
                     })

    if r.status_code >= 400:
        print(' ERROR!!! ')
        raise Exception('Error on calling server: ' + r.text)


curDir = os.path.dirname(os.path.realpath(__file__))
files = os.listdir(curDir + '/' + SOURCE_FOLDER)

fakeApis = ['HelloApp', 'Buses', 'Library']

for fname in files:
    index = 0
    with open('%s/%s/%s' % (curDir, SOURCE_FOLDER, fname), 'rb') as f:
        content = f.read()
        version = '1.0' if not (index % 2) else '1.8'
        postApiRecord(fakeApis[index], 'Test', version, 'http://nowhere', content)
        index = index + 1 if index < len(fakeApis) else 0


print('--- Done ---')
