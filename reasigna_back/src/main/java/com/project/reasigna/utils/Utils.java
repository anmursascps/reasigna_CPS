package com.project.reasigna.utils;

import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;

public class Utils {

    public static boolean isValid(String[] headers, String[] required_columns) {
        // New empty list
        List<String> list_headers = new ArrayList<String>();

        for (int i = 0; i < headers.length; i++) {
            list_headers.add(headers[i].trim());
        }
        return list_headers.containsAll(Arrays.asList(required_columns));
    }
}
