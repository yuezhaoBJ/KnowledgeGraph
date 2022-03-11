const maxSize = 50;

function loadData(path) {
    return new Promise((resolve) => {
        // load json file
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', path, true);
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                // .open will NOT return a value but simply returns undefined in async mode so use a callback
                resolve(xobj.responseText);
            }
        }
        xobj.send(null);
    })
        .then((res) => {
            // process data
            var nodesJson = [{ "fixed": true, "id": 'A', "index": 0, "prop": { "name": "NLP", "size": maxSize }, "x": 724, "y": 616 }],
                linksJson = [];
            let arr = JSON.parse(res);
            let currentIndex = 0;
            const processNode = (n, level, parentId, parentIndex, index) => {
                let iniLevel = level,
                    curParentId = parentId ? `${parentId}-${index}` : `A${index}`;

                currentIndex++;
                nodesJson.push({ "id": curParentId, "index": iniLevel, "prop": { "name": n.lable, "size": maxSize - iniLevel * 10 } });

                let curParentIndex = nodesJson.length - 1;
                linksJson.push({ "source": parentIndex, "target": curParentIndex });

                if (n?.areas?.length) {
                    level++;
                    let innerIndex = 0;
                    n.areas.map((area) => {
                        innerIndex++;
                        processNode(area, level, curParentId, curParentIndex, innerIndex);
                    });
                }
            };
            arr.forEach((a) => {
                processNode(a, 1, '', 0, currentIndex);
            })
            return { nodesJson: nodesJson, linksJson: linksJson };
        })
}
