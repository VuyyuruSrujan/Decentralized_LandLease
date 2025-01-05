import Array "mo:base/Array";
import Nat64 "mo:base/Nat64";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Debug "mo:base/Debug";


actor {

  public type UserRegister = {
    prin:Principal;
    Name:Text;
    PhoneNumber:Nat64;
    Email:Text;
    Location:Text;
    Age:Nat64;
  };
  
  var posts_no:Nat64=0;
  public type initialPost = {
    prin:Principal;
    title:Text;
    location:Text;
    area:Nat64;
    lease_years:Nat64;
    price_per_year:Nat64;
    description:Text;
    postid:Nat64;
  };
  public type Post = {
    prin:Principal;
    title:Text;
    location:Text;
    area:Nat64;
    lease_years:Nat64;
    price_per_year:Nat64;
    description:Text;
    postid:Nat64;
    status:RequestStatus;
  };

  public type RequestStatus ={
    #Rejected;
    #Accepted;
    #Request_sent;
    #Nota;
    #no;
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

  public shared query func get_posts_number():async Nat64{
    return posts_no;
  };

  public func New_Post(details:initialPost):async Text {
    let new_post = {
    prin = details.prin;
    title = details.title;
    location = details.location;
    area = details.area;
    lease_years = details.lease_years;
    price_per_year = details.price_per_year;
    description = details.description;
    postid = details.postid;
    status = #Nota;
  };

    land_posting_for_lease:= Array.append<Post>(land_posting_for_lease , [new_post]);
      posts_no := details.postid+1;
    return "OK";
  };

  public shared query func get_status_by_id(postid:Nat64):async ?Post {
    return Array.find<Post>(land_posting_for_lease , func x=x.postid == postid)
  };

public func update_status(postid: Nat64): async RequestStatus {
    var checking = await get_status_by_id(postid);
    switch (checking) {
        case (?found) {
            var foundd = found;
            var stat = foundd.status;
            let statText = switch (stat) {
                case (#Nota) { "Nota" };
                case (#Rejected) { "Rejected" };
                case (#Accepted) { "Accepted" };
                case (#Request_sent) { "Request_sent" };
                case (#no) { "no" };
            };
            Debug.print(statText);

            if (foundd.status == #Nota) {
                // Create a mutable version of the array
                let mutableArray = Array.thaw<Post>(land_posting_for_lease);
                var index = 0;
                var foundIndex = false; // Declare and initialize foundIndex
                let arraySize = Array.size<Post>(land_posting_for_lease); // Get size before thawing

                // Use a while loop to simulate a breakable loop
                while (index < arraySize and not foundIndex) {
                    if (mutableArray[index].postid == postid) {
                        mutableArray[index] := {
                            prin = mutableArray[index].prin;
                            title = mutableArray[index].title;
                            location = mutableArray[index].location;
                            area = mutableArray[index].area;
                            lease_years = mutableArray[index].lease_years;
                            price_per_year = mutableArray[index].price_per_year;
                            description = mutableArray[index].description;
                            postid = mutableArray[index].postid;
                            status = #Request_sent
                        };
                        foundIndex := true;
                    };
                    index += 1;
                };

                land_posting_for_lease := Array.freeze<Post>(mutableArray);
                return #Request_sent;

            }else{
            return foundd.status;

            }
        };
        case (null) { return #no };
    };
};


  // public shared query func Get_My_All_Post(prin:Principal): async [Post] {
  //   return Array.filter<Post>(land_posting_for_lease , func x=x.prin == prin);
  // };

public shared query func Get_Requested_Post(prin: Principal): async [Post] {
    Array.filter<Post>(
        land_posting_for_lease,
        func x = x.prin== prin and x.status == #Request_sent
    );
};
  public shared query func get_all_posts(): async [Post] {
    return land_posting_for_lease;
  };

  public func delete_Everyone_posts(): async Text {
    land_posting_for_lease:=[];
    return "Deleted";
  };
  
  public type Post_ids = {
    prin:Principal;
    post_id:Nat64;
  };

  var store_ids :[Post_ids] = [];

  public func delete_ids(): async Text {
    store_ids:=[];
    return "Deleted";
  };
  public func saved_Posts(det:Post_ids) : async Text {
    store_ids:=Array.append<Post_ids>(store_ids , [det]);
    return "OK";
  };

  public type Result = {
    #Nat64: Nat64;
    #Text: Text;
};

  // public shared query func getAllIds(prin:Principal): async [Post_ids] {
  //   return Array.filter<Post_ids>(store_ids , func x=x.prin == prin);
  // };
   public shared query func getAllIds(prin: Principal): async Result {
    let filtered = Array.filter<Post_ids>(store_ids, func(x) { x.prin == prin });
    if (filtered.size() > 0) {
        return #Nat64(filtered[0].post_id);
    } else {
        return #Text("null");
    };
  };

  public shared query func get_posts_by_id(post_id:Nat64):async [Post_ids] {
    return Array.filter<Post_ids>(store_ids ,  func x=x.post_id == post_id);
  };

  public shared query func getAll_saved_details():  async [Post_ids]{
    return store_ids;
  };

  // public type ReqDetails = {
  //   To:Principal;
  //   From:Principal;
  //   id:Nat64;
  // };
  // var req_arr:[ReqDetails] = [];

  // public func Store_SendReq(det:ReqDetails): async Text {
  //   req_arr:=Array.append<ReqDetails>(req_arr , [det]);
  //   return "OK";
  // };

  // public shared query func get_Req_details(){
    
  // };

  public shared query func check_myself(postid:Nat64): async RequestStatus{
    var srujan = Array.find<Post>(land_posting_for_lease , func x=x.postid == postid);
    switch(srujan) {
      case(?found) { return found.status };
      case(null) { return #no };
    };
  };
  
};
