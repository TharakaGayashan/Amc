package com.itfac.amc.reportData;

import java.math.BigDecimal;
import java.util.Date;

public interface PaymentReport {
	public String getamc_no();
	public String getuser_id();
	public String getclient_name();
	public String getproduct_name();
	public String getfrequency();
	public String getcurrency_name();
	public BigDecimal getexchange_rate();
	public BigDecimal getmtc_amount_per_product();
	public BigDecimal getmtc_amount_per_product_lkr();
	public BigDecimal gettotal();
	public BigDecimal gettotal_lkr();
	public Date getrec_date();
}