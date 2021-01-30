
Create Table alcohol_country (
	Country varchar(30),
	beer_servings INT,
	spirit_servings INT,
	wine_servings INT,
	total_servings_pure_alcohol decimal
);

select * from alcohol_country;

Create Table happiness_country(
	country varchar(30),
	region varchar (60),
	hemisphere varchar(30),
	happinessscore numeric,
	hdi INT,
	gdp_percapita numeric, 
	beer_percapita INT,
	spirit_percapita INT,
	wine_percapita INT
);
select * from happiness_country;
