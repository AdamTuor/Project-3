-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/4DT5uN
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "neighbourhoods" (
    "HOOD_158" int   NOT NULL,
    "NEIGHBOURHOOD_158" varchar   NOT NULL,
    CONSTRAINT "pk_neighbourhoods" PRIMARY KEY (
        "HOOD_158"
     )
);

CREATE TABLE "assault" (
    "HOOD_158" int   NOT NULL,
    "NEIGHBOURHOOD_158" varchar   NOT NULL,
    "X" FLOAT   NOT NULL,
    "Y" FLOAT   NOT NULL,
    "REPORT_YEAR" int   NOT NULL,
    "REPORT_MONTH" varchar   NOT NULL,
    "LOCATION_TYPE" varchar   NOT NULL,
    "OFFENCE" varchar   NOT NULL,
    "MCI_CATEGORY" varchar   NOT NULL,
    CONSTRAINT "pk_assault" PRIMARY KEY (
        "HOOD_158"
     )
);

CREATE TABLE "auto_theft" (
    "HOOD_158" int   NOT NULL,
    "NEIGHBOURHOOD_158" varchar   NOT NULL,
    "X" FLOAT   NOT NULL,
    "Y" FLOAT   NOT NULL,
    "REPORT_YEAR" int   NOT NULL,
    "REPORT_MONTH" varchar   NOT NULL,
    "LOCATION_TYPE" varchar   NOT NULL,
    "OFFENCE" varchar   NOT NULL,
    "MCI_CATEGORY" varchar   NOT NULL,
    CONSTRAINT "pk_auto_theft" PRIMARY KEY (
        "HOOD_158"
     )
);

CREATE TABLE "bike_theft" (
    "HOOD_158" int   NOT NULL,
    "NEIGHBOURHOOD_158" varchar   NOT NULL,
    "X" FLOAT   NOT NULL,
    "Y" FLOAT   NOT NULL,
    "PRIMARY_OFFENCE" varchar   NOT NULL,
    "REPORT_YEAR" int   NOT NULL,
    "REPORT_MONTH" varchar   NOT NULL,
    CONSTRAINT "pk_bike_theft" PRIMARY KEY (
        "HOOD_158"
     )
);

CREATE TABLE "break_and_enter" (
    "HOOD_158" int   NOT NULL,
    "NEIGHBOURHOOD_158" varchar   NOT NULL,
    "X" FLOAT   NOT NULL,
    "Y" FLOAT   NOT NULL,
    "REPORT_YEAR" int   NOT NULL,
    "REPORT_MONTH" varchar   NOT NULL,
    "LOCATION_TYPE" varchar   NOT NULL,
    "OFFENCE" varchar   NOT NULL,
    "MCI_CATEGORY" varchar   NOT NULL,
    CONSTRAINT "pk_break_and_enter" PRIMARY KEY (
        "HOOD_158"
     )
);

CREATE TABLE "homicide" (
    "HOOD_158" int   NOT NULL,
    "NEIGHBOURHOOD_158" varchar   NOT NULL,
    "X" FLOAT   NOT NULL,
    "Y" FLOAT   NOT NULL,
    "OCC_YEAR" int   NOT NULL,
    "OCC_MONTH" varchar   NOT NULL,
    CONSTRAINT "pk_homicide" PRIMARY KEY (
        "HOOD_158"
     )
);

CREATE TABLE "robbery" (
    "HOOD_158" int   NOT NULL,
    "NEIGHBOURHOOD_158" varchar   NOT NULL,
    "X" FLOAT   NOT NULL,
    "Y" FLOAT   NOT NULL,
    "REPORT_YEAR" int   NOT NULL,
    "REPORT_MONTH" varchar   NOT NULL,
    "LOCATION_TYPE" varchar   NOT NULL,
    "OFFENCE" varchar   NOT NULL,
    "MCI_CATEGORY" varchar   NOT NULL,
    CONSTRAINT "pk_robbery" PRIMARY KEY (
        "HOOD_158"
     )
);

CREATE TABLE "shooting" (
    "HOOD_158" int   NOT NULL,
    "NEIGHBOURHOOD_158" varchar   NOT NULL,
    "X" FLOAT   NOT NULL,
    "Y" FLOAT   NOT NULL,
    "OCC_YEAR" int   NOT NULL,
    "OCC_MONTH" varchar   NOT NULL,
    CONSTRAINT "pk_shooting" PRIMARY KEY (
        "HOOD_158"
     )
);

CREATE TABLE "theft_over" (
    "HOOD_158" int   NOT NULL,
    "NEIGHBOURHOOD_158" varchar   NOT NULL,
    "X" FLOAT   NOT NULL,
    "Y" FLOAT   NOT NULL,
    "REPORT_YEAR" int   NOT NULL,
    "REPORT_MONTH" varchar   NOT NULL,
    "LOCATION_TYPE" varchar   NOT NULL,
    "OFFENCE" varchar   NOT NULL,
    "MCI_CATEGORY" varchar   NOT NULL,
    CONSTRAINT "pk_theft_over" PRIMARY KEY (
        "HOOD_158"
     )
);

CREATE TABLE "theft_from_vehicle" (
    "HOOD_158" int   NOT NULL,
    "NEIGHBOURHOOD_158" varchar   NOT NULL,
    "X" FLOAT   NOT NULL,
    "Y" FLOAT   NOT NULL,
    "REPORT_YEAR" int   NOT NULL,
    "REPORT_MONTH" varchar   NOT NULL,
    "LOCATION_TYPE" varchar   NOT NULL,
    "OFFENCE" varchar   NOT NULL,
    "MCI_CATEGORY" varchar   NOT NULL,
    CONSTRAINT "pk_theft_from_vehicle" PRIMARY KEY (
        "HOOD_158"
     )
);

ALTER TABLE "assault" ADD CONSTRAINT "fk_assault_HOOD_158" FOREIGN KEY("HOOD_158")
REFERENCES "neighbourhoods" ("HOOD_158");

ALTER TABLE "auto_theft" ADD CONSTRAINT "fk_auto_theft_HOOD_158" FOREIGN KEY("HOOD_158")
REFERENCES "neighbourhoods" ("HOOD_158");

ALTER TABLE "bike_theft" ADD CONSTRAINT "fk_bike_theft_HOOD_158" FOREIGN KEY("HOOD_158")
REFERENCES "neighbourhoods" ("HOOD_158");

ALTER TABLE "break_and_enter" ADD CONSTRAINT "fk_break_and_enter_HOOD_158" FOREIGN KEY("HOOD_158")
REFERENCES "neighbourhoods" ("HOOD_158");

ALTER TABLE "homicide" ADD CONSTRAINT "fk_homicide_HOOD_158" FOREIGN KEY("HOOD_158")
REFERENCES "neighbourhoods" ("HOOD_158");

ALTER TABLE "robbery" ADD CONSTRAINT "fk_robbery_HOOD_158" FOREIGN KEY("HOOD_158")
REFERENCES "neighbourhoods" ("HOOD_158");

ALTER TABLE "shooting" ADD CONSTRAINT "fk_shooting_HOOD_158" FOREIGN KEY("HOOD_158")
REFERENCES "neighbourhoods" ("HOOD_158");

ALTER TABLE "theft_over" ADD CONSTRAINT "fk_theft_over_HOOD_158" FOREIGN KEY("HOOD_158")
REFERENCES "neighbourhoods" ("HOOD_158");

ALTER TABLE "theft_from_vehicle" ADD CONSTRAINT "fk_theft_from_vehicle_HOOD_158" FOREIGN KEY("HOOD_158")
REFERENCES "neighbourhoods" ("HOOD_158");

