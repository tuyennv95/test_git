package com.tudinh.kltn.entity.result;

import java.io.Serializable;
import java.util.List;

public class SearchResult<T> implements Serializable {
    private List<T> items;
    private long totalRecord;

    public List<T> getItems() {
        return items;
    }

    public void setItems(List<T> items) {
        this.items = items;
    }

    public long getTotalRecord() {
        return totalRecord;
    }

    public void setTotalRecord(long totalRecord) {
        this.totalRecord = totalRecord;
    }
}



