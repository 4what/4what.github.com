<%@ page contentType="text/html; charset=UTF-8" %>

<%
	out.clear();

	request.setCharacterEncoding("UTF-8");

	out.println(
		"{"
			+ "\"name\": \"" + request.getParameter("name") + "\""
		+ "}"
	);
%>
