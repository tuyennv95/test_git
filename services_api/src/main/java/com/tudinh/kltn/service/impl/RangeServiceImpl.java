package com.tudinh.kltn.service.impl;

import com.tudinh.kltn.entity.Range;
import com.tudinh.kltn.repository.RangeRepository;
import com.tudinh.kltn.service.RangeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
public class RangeServiceImpl implements RangeService {

    @Autowired
    RangeRepository rangeRepository;

    @Override
    public List<Range> getRangesList(HashMap<String, String> propertySearch) {
        return rangeRepository.getRangesList(propertySearch);
    }

    @Override
    public int getCountRange(HashMap<String, String> propertySearch) {
        return rangeRepository.getCountRange(propertySearch);
    }

    @Override
    public Range getRangeById(int id) {
        return rangeRepository.findById(id).get();
    }

    @Override
    public Range createRange(Range range) {
        return rangeRepository
                .save(new Range(range.getRangeName(), range.getDepartmentId(), range.getDescription()));
    }

    @Override
    public boolean updateRange(Range range) {
        Range _range = getRangeById(range.getId());

        if (_range.getId() > 0) {
            rangeRepository.save(range);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteRange(int[] ids) {
        return rangeRepository.deleteRange(ids);
    }
}

