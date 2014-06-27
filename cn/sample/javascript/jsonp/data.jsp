<%@ page contentType="text/html; charset=utf-8" language="java" %>

<%@ page import="java.util.Date" %>

<%
	request.setCharacterEncoding("UTF-8");

	out.println(
		request.getParameter("callback") + "({"
			+ "\"date\": \"" + new Date() + "\""
			+ ", \"method\": \"" + request.getMethod() + "\""
			+ ", \"name\": \"" + request.getParameter("name") + "\""
		+ "});"
	);
%>
