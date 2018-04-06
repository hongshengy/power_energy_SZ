<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=gb2312">
    <title>检疫犬管理系统—打印</title>
    <style>
        @media print {
            input {
                display: none;
            }

            th td {
                font-size: 8pt;
                nowrap:nowrap;
            }
        }

    </style>
</head>

<body>
<!--startprint-->
<div>
    <table border="0" style="font-size:7pt;" width="100%" align="center">
        <thead style="display:table-header-group;font-weight:bold">
        <tr>
            <th id="printTitle" align="center"></th>
            <%--<th id="printTitle" align="center" style="font-weight:bold;border:3px double red"></th>--%>
        </tr>
        </thead>
        <tbody style="text-align:center">
        <tr id="printHead">
            <%--<th>1</th>--%>
            <%--<th>2</th>--%>
        </tr>
        <%--<tr id="printBody">--%>
        <%--<td>1</td>--%>
        <%--<td>2</td>--%>
        <%--</tr>--%>
        </tbody>
        <%--<tfoot style="display:table-footer-group;font-weight:bold">--%>
        <%--<tr>--%>
        <%--<td colspan="2" align="center" style="font-weight:bold;border:3px double blue">每页都有的表尾</td>--%>
        <%--</tr>--%>
        <%--</tfoot>--%>
    </table>
</div>
<!--endprint-->
</body>

<%--jquery--%>
<script type="text/javascript" src="${basePath}/plugins/jquery/jquery-1.9.1.js"></script>

<%--tools--%>
<script type="text/javascript" src="${basePath}/plugins/tools/tools.js"></script>

<script type="text/javascript">

    var paramPageTitle = '${paramaterMap}'

    var printTitle = paramPageTitle.substring(11, paramPageTitle.length - 1);
    $('#printTitle').append(printTitle);

    var printTableHead = new Array();
    var printRowData = new Object();
    var printDataRow = new Object();

    var printTableBody = new Array();

    var $trDom = $('<tr>');
    var $thDom = $('<th>');
    var $tdDom = $('<td>');

    var $trDomNew = $trDom.clone(true);
    var $thDomNew = $thDom.clone(true);
    var $tdDomNew = $tdDom.clone(true);

    if (window.opener != null && !window.opener.closed) {
        var params = window.opener.printDataParams;//获取父窗口中元素，也可以获取父窗体中的值

        $.each(params.printColumns, function (oneI, oneC) {
//            console.log(oneC.checkbox+'__'+oneC.visible+'__'+oneC.title);
            if (!oneC.checkbox && oneC.visible) {
                printRowData = new Object();
                printRowData.field = oneC.field;
                printRowData.title = oneC.title;
                printTableHead.push(printRowData);

                $thDomNew = $thDom.clone(true);
                $thDomNew.append(oneC.title);
                $('#printHead').append($thDomNew);
            }
        });

        $('#printTitle').attr('colspan', printTableHead.length + 1);

        $.each(params.printData, function (printDataI, printDataC) {
            printDataRow = new Object();
            for (var i = 0; i < printTableHead.length; i++) {
                printDataRow[printTableHead[i].field] = printDataC[printTableHead[i].field];

            }
            printTableBody.push(printDataRow);
        });

        for (var i = 0; i < printTableBody.length; i++) {
            $trDomNew = $trDom.clone(true);
            $.each(printTableBody[i], function (oi, oc) {
                $tdDomNew = $tdDom.clone(true);
                $tdDomNew.append(oc);

                $trDomNew.append($tdDomNew);
            });
            $('#printHead').after($trDomNew);

        }
        setTimeout("printFun()", 300);
    }

    function printFun() {
        bdhtml = window.document.body.innerHTML;
        sprnstr = "<!--startprint-->";
        eprnstr = "<!--endprint-->";
        prnhtml = bdhtml.substr(bdhtml.indexOf(sprnstr) + 17);
        prnhtml = prnhtml.substring(0, prnhtml.indexOf(eprnstr));
        window.document.body.innerHTML = prnhtml;
        window.print();
        window.close();
    }
</script>
</html>