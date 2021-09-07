// for execute main function use this package
package main

//import necessary packages
import (
	"database/sql"  // sql methods,keywords
	"encoding/json" // json methods,keywords
	"fmt"           // fmt print methods
	"log"           // log print methods
	"net/http"      // provide http keywords & some http methods
	_ "github.com/go-sql-driver/mysql" //sql driver for create connection with database
	"github.com/gorilla/mux"           //set handler functions
)

// create customer slice. this is lika a array
var customers []Customer

//create customer struct.this is like a object
type Customer struct {
	Id       string `json:"id"`
	Name     string `json:"name"`
	Address  string `json:"address"`
	Contact  string `json:"contact"`
	Password string `json:"password"`
}

// cross origin policies
func setupCorsResponse(w *http.ResponseWriter, r *http.Request) {
	//Allow origins
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	// Allow Methods
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	// Allow Headers
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Authorization")
}

//function getAll customers
func getCustomers(w http.ResponseWriter, r *http.Request) {
	//create customer slice
	var customers2 []Customer
	//apply cross origin policies
	setupCorsResponse(&w, r)
	//set http method type
	if (*r).Method == "OPTIONS" {
		return
	}
	// define http request data type
	w.Header().Set("Content-Type", "application/json")
	// config mysql connection with password,username,host
	db, _ := sql.Open("mysql", "root:ijse@tcp(127.0.0.1:3306)/test")
	// write sql query
	row, err := db.Query("select * from customer")
	if err != nil {
		panic(err.Error())
	} else {
		for row.Next() {
			var id string
			var name string
			var address string
			var contact string
			var password string

			err2 := row.Scan(&id, &name, &address, &contact , &password)
			row.Columns()
			if err2 != nil {
				panic(err2.Error())
			} else {
				customer2 := Customer{
					Id:       id,
					Name:     name,
					Address:  address,
					Contact:  contact,
					Password: password,
				}
				customers2 = append(customers2, customer2)
			}
		}
	}
	defer row.Close()
	// convert customer struc to a json value
	json.NewEncoder(w).Encode(customers2)
}

//function add customer
func addCustomer(w http.ResponseWriter, r *http.Request) {
	//apply cross origin policies
	setupCorsResponse(&w, r)
	// http method type
	if (*r).Method == "OPTIONS" {
		return
	}
	var cust Customer
	json.NewDecoder(r.Body).Decode(&cust)

	// config mysql connection with password,username,host
	db, _ := sql.Open("mysql", "root:ijse@tcp(127.0.0.1:3306)/test")
	// write sql query for the database
	insert, err := db.Query("INSERT INTO customer VALUES (?, ?, ?, ?, ?)", cust.Id, cust.Name, cust.Address, cust.Contact, cust.Password)
	if err != nil {
		panic(err.Error())
	}
	defer insert.Close()
}

//function get customer
func getCustomer(w http.ResponseWriter, r *http.Request) {
	//create variable customer
	var cust Customer
	//apply cross origin policies
	setupCorsResponse(&w, r)
	//set http method type
	if (*r).Method == "OPTIONS" {
		return
	}
	// define http request data type
	w.Header().Set("Content-Type", "application/json")
	//create param for sql
	params := mux.Vars(r)
	//config mysql connection with password,username,host
	db, _ := sql.Open("mysql", "root:ijse@tcp(127.0.0.1:3306)/test")
	// write sql query for the database
	row, err := db.Query("select * from customer where id=?", params["id"])
	if err != nil {
		panic(err.Error())
	} else {
		for row.Next() {
			var id string
			var name string
			var address string
			var contact string
			var password string

			err2 := row.Scan(&id, &name, &address, &contact, &password)
			row.Columns()
			if err2 != nil {
				panic(err2.Error())
			} else {
				customer := Customer{
					Id:       id,
					Name:     name,
					Address:  address,
					Contact:  contact,
					Password: password,
				}
				cust = customer
			}
		}
	}
	defer row.Close()
	//convert Customer struc to a json value
	json.NewEncoder(w).Encode(cust)
}

func getCustomerByNamePassword(w http.ResponseWriter, r *http.Request) {
	//create variable customer
	var cust Customer
	//apply cross origin policies
	setupCorsResponse(&w, r)
	//set http method type
	if (*r).Method == "OPTIONS" {
		return
	}
	// define http request data type
	w.Header().Set("Content-Type", "application/json")
	//create param for sql
	params := mux.Vars(r)
	//config mysql connection with password,username,host
	db, _ := sql.Open("mysql", "root:ijse@tcp(127.0.0.1:3306)/test")
	// write sql query for the database
	row, err := db.Query("select * from customer where name=? && password=?", params["name"],params["password"])
	if err != nil {
		panic(err.Error())
	} else {
		for row.Next() {
			var id string
			var name string
			var address string
			var contact string
			var password string

			err2 := row.Scan(&id, &name, &address, &contact, &password)
			row.Columns()
			if err2 != nil {
				panic(err2.Error())
			} else {
				customer := Customer{
					Id:       id,
					Name:     name,
					Address:  address,
					Contact:  contact,
					Password: password,
				}
				cust = customer
			}
		}
	}
	defer row.Close()
	//convert Customer struc to a json value
	json.NewEncoder(w).Encode(cust)
}

//function update customer
func updateCustomer(w http.ResponseWriter, r *http.Request) {
	//apply cross origin policies
	setupCorsResponse(&w, r)
	//set http method type
	if (*r).Method == "OPTIONS" {
		return
	}
	//create param for sql
	params := mux.Vars(r)
	var cust Customer
	json.NewDecoder(r.Body).Decode(&cust)
	//id := r.FormValue("id")
	// name := r.FormValue("name")
	// address := r.FormValue("address")
	// contact := r.FormValue("contact")

	//config mysql connection with password,username,host
	db, _ := sql.Open("mysql", "root:ijse@tcp(127.0.0.1:3306)/test")
	// write sql query for the database
	update, err := db.Query("update customer set name=? , contact=? , address=? , password=? where id= ?", cust.Name, cust.Contact, cust.Address, cust.Password, params["id"])
	if err != nil {
		panic(err.Error())
	}
	defer update.Close()

}

//function delete customer
func deleteCustomer(w http.ResponseWriter, r *http.Request) {
	//apply cross origin policies
	setupCorsResponse(&w, r)
	//set http method type
	if (*r).Method == "OPTIONS" {
		return
	}
	// define http request data type
	w.Header().Set("Content-Type", "application/json")
	//create param for sql
	params := mux.Vars(r)
	//config mysql connection with password,username,host
	db, _ := sql.Open("mysql", "root:ijse@tcp(127.0.0.1:3306)/test")
	// write sql query for the database
	delete, err := db.Query("delete from customer where id=?", params["id"])

	if err != nil {
		panic(err.Error())
	}
	defer delete.Close()
	//convert Customer struct to a json value
	json.NewEncoder(w).Encode(customers)
}

// main function provide by package main
func main() {
	//create new router for the access the handlefuction
	r := mux.NewRouter()
	fmt.Println("Server Running...")
	//set handle functions path & method
	r.HandleFunc("/api/customers", getCustomers).Methods("GET", "OPTIONS")
	r.HandleFunc("/api/customers/{id}", getCustomer).Methods("GET", "OPTIONS")
	r.HandleFunc("/api/customers/login/{name}/{password}", getCustomerByNamePassword).Methods("GET", "OPTIONS")
	r.HandleFunc("/api/customers", addCustomer).Methods("POST", "OPTIONS")
	r.HandleFunc("/api/customers/{id}", updateCustomer).Methods("PUT", "OPTIONS")
	r.HandleFunc("/api/customers/{id}", deleteCustomer).Methods("DELETE", "OPTIONS")
	// set server port
	log.Fatal(http.ListenAndServe(":8000", r))
}
