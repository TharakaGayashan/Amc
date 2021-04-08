package com.itfac.amc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.itfac.amc.entity.Currency;

@Repository
public interface CurrencyRepository extends JpaRepository<Currency, Integer> {

	
	
}
