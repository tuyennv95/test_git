package com.tudinh.kltn.repository.impl;

import com.tudinh.kltn.entity.Range;
import com.tudinh.kltn.repository.RangeRepositoryCustom;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class RangeRepositoryImpl implements RangeRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    Query query;
    String qr;

    @Override
    public List<Range> getRangesList(HashMap<String, String> propertySearch) {
        qr = "SELECT id, department_id AS departmentId, range_name AS rangeName, description" +
                " FROM rangee Where 1 = 1 ";

        if (propertySearch.get("departmentId") != null) {
            qr += " AND department_id = " + propertySearch.get("departmentId");
        }
        if (propertySearch.get("searchText") != null) {
            qr += " AND range_name like '%" + propertySearch.get("searchText") + "%'";
        }
        if (propertySearch.get("orderCol") != null && propertySearch.get("orderCol") != "") {
            qr += " order by " + propertySearch.get("orderCol");
            if (propertySearch.get("isAsc") != null) {
                if (Boolean.parseBoolean(propertySearch.get("isAsc")) == true) {
                    qr += " ASC ";
                } else {
                    qr += " DESC ";
                }
            }
        }
        if (propertySearch.get("limit") != null && propertySearch.get("page") != null) {
            int startSearch = (Integer.parseInt(propertySearch.get("page")) - 1)
                    * Integer.parseInt(propertySearch.get("limit"));
            qr += " limit " + startSearch + "," + propertySearch.get("limit");
        }

        query = em.createNativeQuery(qr, "RangeResultMapping");

        return query.getResultList();
    }

    @Override
    public int getCountRange(HashMap<String, String> propertySearch) {
        qr = "SELECT id, department_id AS departmentId, range_name AS rangeName, description" +
                " FROM rangee Where 1 = 1 ";

        if (propertySearch.get("departmentId") != null) {
            qr += " AND department_id = " + propertySearch.get("departmentId");
        }
        if (propertySearch.get("searchText") != null) {
            qr += " AND range_name like '%" + propertySearch.get("searchText") + "%'";
        }

        query = em.createNativeQuery(qr, "RangeResultMapping");
        List<Range> list = query.getResultList();

        return list.size();
    }

    @Override
    public boolean deleteRange(int[] ids) {
        qr = "DELETE FROM rangee WHERE ";

        String qr2 = "id IN (0";
        for (int i = 0; i < ids.length; i++) {
            qr2 += ", " + ids[i];
        }

        query = em.createNativeQuery(qr + qr2 + ")");

        try {
            query.executeUpdate();
        } catch (Exception e) {
            System.out.println("deleteRange Lỗi: " + e);
            return false;
        }

        return true;
    }
}
