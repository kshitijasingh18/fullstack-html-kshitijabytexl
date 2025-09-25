    const readline=require("readline")
    const rl=readline.createInterface({
        input:process.stdin,
        output:process.stdout
    });
    const employees=[
        {
            id:"1",
            name:"Alice",
            Age:34
        },
        {
            id:"2",
            name:"inBorder",
            Age:30
        },
        {
            id:"3",
            name:"land",
            Age:34
        }
    ];
    function showMenu(){
        console.log("\n=== Employee Manager ===");
        console.log("1. Add Employee");
        console.log("2. List Employees");
        console.log("3. Remove Employee");
        console.log("4. Exit\n");
        rl.question("Enter your choise:",(choice)=>{
            switch (choice.trim()){
                case "1":
                    addEmployee();
                    break;
                case "2":
                    listEmployees();
                    break;
                case "3":
                    removeEmployee();
                    break;
                case "4":
                    console.log("Exiting...");
                    rl.close();
                    break;
                default:
                    console.log("Invalid choice! Try again.");
                    showMenu();        
            }
        });
    }
function addEmployee() {
  rl.question("Enter Employee ID: ", (id) => {
    rl.question("Enter Employee Name: ", (name) => {
      if (employees.find(emp => emp.id === id.trim())) {
        console.log("Employee with this ID already exists!");
      } else {
        employees.push({ id: id.trim(), name: name.trim() });
        console.log("Employee added successfully!");
      }
      showMenu();
    });
  });
}
function listEmployees() {
  console.log("\n--- Employee List ---");
  if (employees.length === 0) {
    console.log("No employees found.");
  } else {
    employees.forEach(emp => {
      console.log(`ID: ${emp.id}, Name: ${emp.name}`);
    });
  }
  showMenu();
}
function removeEmployee() {
  rl.question("Enter Employee ID to remove: ", (id) => {
    const index = employees.findIndex(emp => emp.id === id.trim());
    if (index === -1) {
      console.log("Employee not found!");
    } else {
      employees.splice(index, 1);
      console.log("Employee removed successfully!");
    }
    showMenu();
  });
}
showMenu();
