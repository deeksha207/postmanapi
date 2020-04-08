let counter = 6;
let c = 2;
let json = document.getElementById('jsonid');
let req = document.getElementById('req');
let custom = document.getElementById('custom');


function addparam(argument) {
    let paramrows = document.getElementById('mytab');
    let rowlen = mytab.rows.length;
    let rows = paramrows.insertRow(counter);
    let p1 = document.createElement("input");
    p1.setAttribute("type", "text");
    p1.setAttribute("id", `param${c}`);
    p1.setAttribute("placeholder", `Enter Parameter ${c} key`);
    let p2 = document.createElement("input");
    p2.setAttribute("type", "text");
    p2.setAttribute("id", `para${c}`);
    p2.style.marginLeft = '0';
    p2.setAttribute("placeholder", `Enter Parameter ${c} value`);
    let but = document.createElement("input");
    but.setAttribute("type", "button");
    but.setAttribute("value", "-");
    but.setAttribute("onclick", "deletefield(this);");
    but.setAttribute("class", "mybtn1");
    but.style.marginLeft = '0';
    but.style.width = '52px';
    but.style.outline = 'none';
    but.style.boxSizing = 'border-box';
    var cell = rows.insertCell(-1);
    cell.innerHTML = `Parameter ${c}:`;
    cell = rows.insertCell(-1);
    cell.appendChild(p1);
    cell = rows.insertCell(-1);
    cell.appendChild(p2);
    cell = rows.insertCell(-1);
    cell.appendChild(but);
    counter++;
    c++;
}


function deletefield(r) {
    let mybtn1 = document.getElementsByClassName("mybtn1");
    let ans = confirm("If you want to delete parameter then press OK!");
    if (ans) {
        let i = r.parentNode.parentNode.rowIndex;
        document.getElementById('mytab').deleteRow(i);
        counter--;
    }
}

let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
    document.getElementById("response").value = "Please wait...Fetching response";
    let url = document.getElementById("url").value;
    let requestT = document.querySelector("input[name='requestT']:checked").value;
    let contentT = document.querySelector("input[name='contentT']:checked").value;

    if (contentT == 'custom') {
        data = {};
        for (let i = 0; i < c; i++) {
            let key;
            let doc = document.getElementById('param' + (i + 1));
            if (doc !== null) {
                key = doc.value;
                let value = document.getElementById('para' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('area').value;
    }

    console.log(url);
    console.log(requestT);
    console.log(contentT);
    console.log('data is', data);

    if (requestT == 'get') {
        fetch(url, {
            method: 'get',
            mode: 'cors'
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('response').value = text;
            });
    }
    else {
        fetch(url, {
            method: 'post',
            body: data,
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('response').value = text;
            });
    }

});
