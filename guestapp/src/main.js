function load() {

    var res = sandproof.analyze();
    console.log(res);

    //var res = sandblaster.detect();
    //console.log(res)

    var script_ok = false;
    var sandbox_ok = false;

    if (true) {
        script_ok = true;
        startTime();
        setToSuccess("test-javascript");
    }

    if (res.sandboxed === true) {
        sandbox_ok = true;
        setToSuccess("test-sandbox");
    }

    if (script_ok && sandbox_ok) {
        showForm();
    }
}

function setToSuccess(id) {
    document.getElementById(id).classList.remove("list-group-item-danger");
    document.getElementById(id).classList.add("list-group-item-success");
}

//##############################################################################

function startTime() {
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    // add a zero in front of numbers<10
    m=checkTime(m);
    s=checkTime(s);
    document.getElementById('datetime').innerHTML=" - "+h+":"+m+":"+s;
    t=setTimeout('startTime()',500);
}

function checkTime(i) {
    if (i<10) {
        i="0" + i;
    }
    return i;
}

function showForm() {
    document.getElementById('myForm').style.visibility = 'visible';
}