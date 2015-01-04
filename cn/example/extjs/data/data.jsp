<%@ page contentType="text/html; charset=UTF-8" language="java" %>

<%@ page import="java.util.*" %>

<%
	request.setCharacterEncoding("UTF-8");

	out.clear();

	String method = request.getParameter("method");

	if (method == null) {
		return;
	}

	String id = request.getParameter("id");
	String query = request.getParameter("query");


	/*
	{
		"success": true|false,
		"data": {
			"id": "",
			"date": "",
			...
		},
		"msg": "message"
	}
	*/
	if (method.equals("form")) {
		out.println("{\"success\": true, \"data\": {"
			+ "\"id\": \"" + id + "\""
			+ ", \"date\": \"2011-01-01\""
			+ "}}"
		);

		//out.println("{\"success\": false, \"msg\": \"message\"}");

		return;
	}


	/*
	{
		"total": 0,
		"rows": [
			{
				"id": "",
				"number": 0,
				"date": "",
				"boolean": true|false,
				...
			},
			...
		]
	}
	*/
	if (method.equals("json")) {
		int total = 100;

		StringBuilder results = new StringBuilder("{\"total\": " + total);

		StringBuilder rows = new StringBuilder(", \"rows\": [");

		int limit = Integer.parseInt(request.getParameter("limit"), 10);
		int start = Integer.parseInt(request.getParameter("start"), 10);
		int end = start + limit;

		Calendar date = Calendar.getInstance();

		for (int i = start; i < (end < total ? end : total); i++) {
			date.add(Calendar.SECOND, i);

			rows.append(
				"{"
				+ "\"id\": \"" + (i + 1) + "\""
				+ ", \"number\": \"" + (Math.random() * 100) + "\""
				+ ", \"date\": \"" + date.getTime() + "\""
				+ ", \"boolean\": " + (i % 2 == 0)
				+ "},"
			);
		}

		rows.deleteCharAt(rows.length() - 1).append("]");

		results.append(rows).append("}");

		out.println(results);

		return;
	}


	/*
	{
		"total": 0,
		"rows": [
			["value", "text"],
			...
		]
	}
	*/
	if (method.equals("array")) {
		int total = 100;

		StringBuilder results = new StringBuilder("{\"total\": " + total);

		StringBuilder rows = new StringBuilder(", \"rows\": [");

		int limit = request.getParameter("limit") != null ? Integer.parseInt(request.getParameter("limit"), 10): 10;
		int start = request.getParameter("start") != null ? Integer.parseInt(request.getParameter("start"), 10): 0;
		int end = start + limit;

		for (int i = start; i < (end < total ? end : total); i++) {
			rows.append(
				"["
				+ "\"" + (i + 1) + "\""
				+ ", \"" + (Math.random() * 10000) + "\""
				+ "],"
			);
		}

		rows.deleteCharAt(rows.length() - 1).append("]");

		results.append(rows).append("}");

		out.println(results);

		return;
	}


	/*
	[
		{
			"text": "",
			"id": "",
			//"allowDrag": false,
			//"checked": false,
			"singleClickExpand": true,
			"children": [
				{
					"text": "",
					"id": "",
					//"allowDrag": false,
					//"checked": false,
					"leaf": true
				},
				...
			]
		},
		...
	]
	*/
	if (method.equals("tree")) {
		StringBuilder data = new StringBuilder("[");

/*
		for (int i = 0; i < 10; i++) {
			data.append(
				"{"
				+ "\"text\": \"" + i + "\""
				+ ", \"id\": \"" + i + "\""
				+ ", \"singleClickExpand\": true"
				+ ", \"children\": ["
			);

			for (int j = 0; j < 10; j++) {
				data.append(
					"{"
					+ "\"text\": \"" + (i + "-" + j) + "\""
					+ ", \"id\": \"" + (i + "-" + j) + "\""
					+ ", \"leaf\": true"
					+ "},"
				);
			}

			data.deleteCharAt(data.length() - 1).append("]},");
		}
*/

		String node = request.getParameter("node");

		for (int i = 0; i < 10; i++) {
			data.append("{");

			if (node.startsWith("src")) {
				data.append(
					"\"text\": \"" + i + "\""
					+ ", \"id\": \"" + i + "\""
					+ ", \"singleClickExpand\": true"
				);
			} else {
				data.append(
					"\"text\": \"" + (node + "-" + i) + "\""
					+ ", \"id\": \"" + (node + "-" + i) + "\""
					+ ", \"leaf\": true"
				);
			}

			data.append("},");
		}

		data.deleteCharAt(data.length() - 1).append("]");

		out.println(data);

		return;
	}


	/*
	[
		{
			"id": "",
			"date": "",
			"singleClickExpand": true,
			"children": [
				{
					"id": "",
					"date": "",
					"leaf": true,
					...
				 },
				...
			]
		},
		...
	]
	*/
	if (method.equals("treegrid")) {
		StringBuilder data = new StringBuilder("[");

		Calendar date = Calendar.getInstance();

		for (int i = 0; i < 10; i++) {
			date.add(Calendar.HOUR, i);

			data.append(
				"{"
				+ "\"id\": \"" + i + "\""
				+ ", \"date\": \"" + date.getTime() + "\""
				+ ", \"singleClickExpand\": true"
				+ ", \"children\": ["
			);

			for (int j = 0; j < 10; j++) {
				date.add(Calendar.SECOND, j);

				data.append(
					"{"
					+ "\"id\": \"" + (i + "-" + j) + "\""
					+ ", \"date\": \"" + date.getTime() + "\""
					+ ", \"leaf\": true"
					+ "},"
				);
			}

			data.deleteCharAt(data.length() - 1).append("]},");
		}

		data.deleteCharAt(data.length() - 1).append("]");

		out.println(data);

		return;
	}


	/*
	{
		"success": true|false,
		"msg": "message"
	}
	*/
	out.println("{\"success\": true, \"msg\": \"message\"}");
%>
