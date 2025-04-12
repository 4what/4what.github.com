<%@ page contentType="text/html; charset=UTF-8" %>

<%
	out.clear();

	request.setCharacterEncoding("UTF-8");
%>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title></title>

		<script>
			window.name = '{'
				+ '"name": "<%= request.getParameter("name") %>"'
			+ '}';
		</script>
	</head>
	<body></body>
</html>
