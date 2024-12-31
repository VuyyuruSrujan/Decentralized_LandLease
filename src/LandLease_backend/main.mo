import Array "mo:base/Array";
import Nat64 "mo:base/Nat64";
import Principal "mo:base/Principal";


actor {

  public type UserRegister = {
    prin:Principal;
    Name:Text;
    PhoneNumber:Nat64;
    Email:Text;
    Location:Text;
    Age:Nat64;
  };

  public type Post = {
    prin:Principal;
    title:Text;
    location:Text;
    area:Nat64;
    lease_years:Nat64;
    price_per_year:Nat64;
    description:Text;
  };

  var userRegistration:[UserRegister] = [];
  var land_posting_for_lease:[Post] = [];
  public func RegisterUser(newDetails :UserRegister ):async Text{
    userRegistration:=Array.append<UserRegister>(userRegistration , [newDetails]);
    return "OK";
  };

  public shared query func GetUserDetailsByPrincipal(prin:Principal): async ?UserRegister {
    var answer = Array.find<UserRegister>(userRegistration , func x=x.prin == prin);
    return answer;
  };
  public shared query func GetUserName(prin:Principal): async Text {
    var answer = Array.find<UserRegister>(userRegistration , func x=x.prin == prin);
    switch(answer) {
      case(?found) { return found.Name };
      case(null) { return "null" };
    };
  };

  public func DeleteRegisterUsers() : async Text {
    userRegistration:=[];
    return"Deleted";
  };

  public func New_Post(details:Post):async Text {
    land_posting_for_lease:= Array.append<Post>(land_posting_for_lease , [details]);
    return "OK";
  };

  public shared query func Get_My_All_Post(prin:Principal): async [Post] {
    return Array.filter<Post>(land_posting_for_lease , func x=x.prin == prin);
  };

  public func delete_Everyone_posts(): async Text {
    land_posting_for_lease:=[];
    return "Deleted";
  };
  

};
