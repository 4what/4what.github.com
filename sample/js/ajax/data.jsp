<%@ page contentType="text/html; charset=UTF-8" language="java" %>

<%@ page import="java.io.BufferedReader" %>
<%@ page import="java.io.IOException" %>
<%@ page import="java.util.Date" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.Map" %>

<%!
	String getParameter(HttpServletRequest request, String name) {
		String value = request.getParameter(name);

		// for XDomainRequest
		try {
			if (value == null) {
				Map<String, String> map = new HashMap<String, String>();

				BufferedReader reader = request.getReader();

				String data;
				while ((data = reader.readLine()) != null) {
					for (String item : data.split("&")) {
						String[] array = item.split("=");
						map.put(array[0], array[1]);
					}
				}

				return map.get(name);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}

		return value;
	}
%>

<%
	out.clear();

	request.setCharacterEncoding("UTF-8");


	// for CORS
	response.setHeader("Access-Control-Allow-Credentials", "true"); // cookie

	String origin = request.getHeader("Origin");
	//if (origin.contains("example.com")) {
		response.setHeader("Access-Control-Allow-Origin", origin);
	//}


	// P3P
	//response.setHeader("P3P", "CP=\"\"");


	// defer
	for (int i = 0; i < 10000; i++) {
		System.out.println(new Date());
	}


	out.println(
		"{"
			+ "\"date\": \"" + new Date() + "\""
			+ ", \"method\": \"" + request.getMethod() + "\""
			+ ", \"name\": \"" + getParameter(request, "name") + "\""
		+ "}"
	);
%>
