<%@ page contentType="text/html; charset=UTF-8" %>

<%
	out.clear();

	request.setCharacterEncoding("UTF-8");

	out.println(
		request.getParameter("callback") + "({"
			+ "\"name\": \"" + request.getParameter("name") + "\""
		+ "});"
	);
%>
