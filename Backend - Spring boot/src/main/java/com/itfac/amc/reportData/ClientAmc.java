package com.itfac.amc.reportData;

import java.sql.Date;

public interface ClientAmc {
	public String getclient_id();
	public String getamc_no();
	public Date getstart_date();
	public String getcategory_name();
	public int getamc_product_no();
	public String getproduct_description();
	public String getdepartment_name();
	public String getamc_serial_no();
	public String getfrequency();
	public Date getmtc_start_date();
	public Date getmtc_end_date();
}
