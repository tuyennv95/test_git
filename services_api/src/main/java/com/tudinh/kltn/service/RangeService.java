package com.tudinh.kltn.service;

import com.tudinh.kltn.entity.Range;

import java.util.HashMap;
import java.util.List;

public interface RangeService {

    List<Range> getRangesList(HashMap<String, String> propertySearch);

    int getCountRange(HashMap<String, String> propertySearch);

    Range getRangeById(int id);

    Range createRange(Range range);

    boolean updateRange(Range range);

    boolean deleteRange(int[] ids);
}