package com.tudinh.kltn.repository;

import com.tudinh.kltn.entity.Range;

import java.util.HashMap;
import java.util.List;


public interface RangeRepositoryCustom {

    List<Range> getRangesList(HashMap<String, String> propertySearch);

    int getCountRange(HashMap<String, String> propertySearch);

    boolean deleteRange(int[] ids);

}
