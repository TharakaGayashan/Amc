package com.itfac.amc.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.itfac.amc.util.Auditable;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Data
@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "client_department")
public class ClientDepartment extends Auditable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "dept_id")
	private int deptId;

	@NotEmpty(message = "Department name cannot be empty")
	@Size(max = 100, message = "Department name must be maximum 100 characters")
	@Column(name = "department_name", length = 100, nullable = false)
	private String departmentName;

	@Column(name = "active")
	private boolean isActive;
	
	@Email(message = "Email must be valid")
	@Size(max = 60, message = "Email must be maximum 60 characters")
	@Column(length = 60, nullable = false)
	private String email;

	@NotEmpty(message = "Contact number cannot be empty")
	@Size(min = 10, max = 60, message = "Contact number must be between 10 and 60 characters")
	@Column(name = "conatact_no", length = 60, nullable = false)
	private String contactNo;

	@NotEmpty(message = "Contact person cannot be empty")
	@Size(max = 100, message = "Contact person must be maximum 100 characters")
	@Column(name = "conatact_person", length = 100, nullable = false)
	private String contactPerson;

	@Column(nullable = false)
	private String address = "Matara";

	@Column(name = "saved_ip", length = 20)
	private String savedIp;
	
	@Valid
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "client_id", nullable = false, foreignKey = @ForeignKey(name = "client_dept_fk"))
	@OnDelete(action = OnDeleteAction.CASCADE)
	@Getter(onMethod_ = @JsonIgnore)
	@Setter(onMethod_ = @JsonProperty)
	private  Client client;
}
