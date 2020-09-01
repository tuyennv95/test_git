package com.tudinh.kltn.controller;

import com.tudinh.kltn.entity.Department;
import com.tudinh.kltn.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/department")
public class DepartmentController {

    @Autowired
    DepartmentService departmentService;

    @GetMapping("")
    public List<Department> getDepartmentsList() {
        return departmentService.getDepartmentsList();
    }

    @GetMapping("/{id}")
    public Department getDepartment(@PathVariable("id") int id) {
        return departmentService.getDepartmentById(id);
    }

    @PostMapping(value = "/create")
    public boolean createDepartment(@RequestBody Department department) {
        System.out.println(department);
        Department departmentTg = departmentService.getDepartmentById(department.getId());
        if (departmentTg != null) {
            System.out.println(department.getId() + " đã tồn tại");
            return false;
        } else {
            return departmentService.createDepartment(department);
        }
    }

    @PutMapping("/update")
    public boolean updateDepartment(@RequestBody Department department) {
        System.out.println(department);
        Department departmentTg = departmentService.getDepartmentById(department.getId());
        if (departmentTg == null) {
            System.out.println(department.getId() + " không tồn tại");
            return false;
        } else {
            return departmentService.updateDepartment(department);
        }
    }

    @PostMapping("/delete")
    public boolean deleteDepartment(@RequestBody int[] ids) {
        return departmentService.deleteDepartment(ids);
    }
}