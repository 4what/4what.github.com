<%@ page contentType="text/html; charset=utf-8" language="java" %>

<%@ page import="java.util.Date" %>

<%
	request.setCharacterEncoding("UTF-8");

	// defer
	for (int i = 0; i < 10000; i++) {
		System.out.println(new Date());
	}

	out.println(
		"{"
			+ "\"date\": \"" + new Date() + "\""
			+ ", \"method\": \"" + request.getMethod() + "\""
			+ ", \"name\": \"" + request.getParameter("name") + "\""
		+ "}"
	);
%>
