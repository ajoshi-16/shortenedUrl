angular.module("myApp", []).controller("myAppCtrl", function ($scope, $http) {

    var refreshWaitTime = 2000;

    $scope.frequency = {};

    $http.get('/aboutauto/repolist').then(function successCallback(response){
        $scope.repositoryList = response.data;
    }, function errorCallback(response){
        console.log("Unable to perform get request");
    });

    $http.get('/aboutauto/memberlist').then(function successCallback(response){
        $scope.teamMemberList = response.data;
    }, function errorCallback(response){
        console.log("Unable to perform get request");
    });

    $http.get('/autohandler/getallmoduledata').then(function successCallback(response){
        $scope.allModuleData = response.data.module_data;
    }, function errorCallback(response){
        console.log("Unable to perform get request");
    });

    $http.get('/aboutauto/modulelist').then(function successCallback(response){
        $scope.allModuleDataList = response.data.modulelist;
    }, function errorCallback(response){
        console.log("Unable to perform request");
    });

    $http.get('/jenkinshandler/getallcompleteddetails').then(function successCallback(response){
            $scope.jobslist = response.data;
    }, function errorCallback(response){
        console.log("Unable to perform get request");
    });

    $http.get('/jenkinshandler/getallrunningdetails').then(function successCallback(response){
        $scope.running_jobs_list = response.data;
    }, function errorCallback(response){
        console.log("Unable to perform get request");
    });

    $scope.getSubmodulesList = function (module_name, module_repo) {
        var payload = {
            moduleName: module_name,
            reponame: module_repo
        };

        var data = JSON.stringify(payload);

        var config = {
            headers : {
                'Content-Type': 'application/json;charset=UTF-8;'
            }
        };

        $http.post('/autohandler/getsubmodules', data, config)
        .then(function successCallback(response){
            $scope.submodulelist = response.data.submodulelist;
        }, function errorCallback(response){
            console.log("Unable to perform request");
        });
    };

// Jenkins Handler Functions
    $scope.deleteBuild = function (selected_Job_Name){
        var payload = {
            jenkins_job_name: selected_Job_Name,
        };

        var payloadData = JSON.stringify(payload);

        var config = {
            headers : {
                'Content-Type': 'application/json;charset=UTF-8;'
            },
            data : payloadData
        };

        $http.delete('/jenkinshandler/deletejob', config)
            .then(function successCallback(response){
                $scope.response = response;
                $('#deleteBuild').modal('hide');
            }, function errorCallback(response){
                console.log("Unable to perform get request");
        });
        location.reload();
    };

    $scope.stopJenkinsJob = function (selected_Job_Name, selected_build_number){
        var payload = {
            jenkins_job_name: selected_Job_Name,
            build_no: selected_build_number
        };

        var payloadData = JSON.stringify(payload);

        var config = {
            headers : {
                'Content-Type': 'application/json;charset=UTF-8;'
            },
        };

        $http.post('/jenkinshandler/stopbuild', payloadData, config)
            .then(function successCallback(response){
                $scope.response = response;
                $('#stopBuild').modal('hide');
                location.reload();
            }, function errorCallback(response){
                console.log("Unable to perform post request");
        });
    };

// Functions to handle test Coverage

    $scope.getCoverage = function(coverage_module, c_reponame, coverage_submodule) {
        var payload = {
            moduleName: coverage_module,
            reponame: c_reponame,
            submoduleName: coverage_submodule
        };

        var data = JSON.stringify(payload);

        var config = {
            headers : {
                'Content-Type': 'application/json;charset=UTF-8;'
            }
        };

        $http.post('/autohandler/getCoverage', data, config)
            .then(function successCallback(response){
                $scope.coverageData = response.data;
            }, function errorCallback(response){
            console.log("Unable to perform request");
        });
    };

// Functions to handle Run Auto page

    $scope.buildJenkinsJob = function(module_name, submodule_name, repo_link, suite_name) {
        var payload = {
            moduleName: module_name,
            submoduleName: submodule_name,
            repolink: repo_link,
            suite: suite_name
        };

        var data = JSON.stringify(payload);

        var config = {
            headers : {
                'Content-Type': 'application/json;charset=UTF-8;'
            }
        };

        $http.post('/jenkinshandler/runjob', data, config)
        .then(function successCallback(response){
            $scope.job_actual_name = response.data.job_name;
            $scope.isSuccess = true;
            document.getElementById("run_auto_form").reset();
        }, function errorCallback(response){
            $scope.isFailure = true;
        });
    };

    $scope.getSuiteList = function(module_name, module_repo_name, submodule_name) {
        var payload = {
            moduleName: module_name,
            repoName: module_repo_name
        };

        if(submodule_name){
            payload["submoduleName"] = submodule_name;
        }else{
            payload["submoduleName"] = "";
        }

        var data = JSON.stringify(payload);

        var config = {
            headers : {
                'Content-Type': 'application/json;charset=UTF-8;'
            }
        };

        $http.post('/autohandler/getsuites', data, config)
        .then(function successCallback(response){
            $scope.suiteList = response.data.SuiteList;
            console.log($scope.suiteList);
            if($scope.suiteList.length){
                $scope.ifNoSuite = false;
            }else{
                $scope.ifNoSuite = true;
            }
        }, function errorCallback(response){
            console.log("Unable to perform request");
        });
    };

    $scope.saveSuite = function (module_name, module_repo, suite_name, suite_description, submodule_name, suite_type, schedule_freq, frequency_selected) {

        var payload = {
            moduleName: module_name,
            repo_name: module_repo,
            suitename: suite_name,
            description: suite_description
        };

        if(submodule_name){
            payload["submoduleName"] = submodule_name;
        }else{
            payload["submoduleName"] = "";
        }

        if(suite_type && schedule_freq && frequency_selected ){
            payload["suite_type"] = suite_type;
            payload["schedule_frequency"] = schedule_freq;
            payload["schedule_time"] = frequency_selected;
        }else{
            payload["suite_type"] = "";
            payload["schedule_frequency"] = "";
            payload["schedule_time"] = "";
        }

        var data = JSON.stringify(payload);

        var config = {
            headers : {
                'Content-Type': 'application/json;charset=UTF-8;'
            }
        };

        $http.post('/autohandler/addsuite', data, config)
        .then(function successCallback(response){
            $scope.suitedata = response.data.submodulelist;
            $('#suitemodal').modal('hide').remove();
        }, function errorCallback(response){
            console.log("Unable to perform request");
        });
        location.reload();
    };

// Functions to handle About page POST Requests...

    $scope.editUser = function (editUserNameId, editUserEmailId, editLocationId, current_module_name, current_repo_name, isMoveModule, submodule_name) {
        var data = {
            member_userName: editUserNameId,
            member_email: editUserEmailId,
            member_location: editLocationId,
            member_moduleOwner: current_module_name,
            member_moduleRepo: current_repo_name
        };

        if(isMoveModule){
            data["needToMoveModule"] = isMoveModule;
        }else{
            data["needToMoveModule"] = "";
        }

        if(submodule_name){
            data["submodule_name"] = submodule_name;
        }else{
            data["submodule_name"] = "";
        }

        var config = {
            headers : {
                'Content-Type': 'application/json;charset=UTF-8;'
            },
        };

        $http.post('/aboutauto/editmember', JSON.stringify(data), config)
            .then(function successCallback(response){
                $scope.response = response;
                $('#userModal').modal('hide').remove();
            }, function errorCallback(response){
            $('#failedUserMessage').removeClass('d-none');
        });
        setInterval(() => location.reload(), refreshWaitTime);
    };

    $scope.saveTeamMember = function (user_name, email_id, locationId, cmodule_name, cmodule_repo, csubmodule_name) {
        var data = {
            userName: user_name,
            email: email_id,
            location: locationId,
            moduleOwner: cmodule_name,
            moduleRepo: cmodule_repo
        };
        console.log(csubmodule_name)

        if(csubmodule_name){
            data["submodule_name"] = csubmodule_name;
        }else{
            data["submodule_name"] = "";
        }

        var config = {
            headers : {
                'Content-Type': 'application/json;charset=UTF-8;'
            }
        };

        $http.post('/aboutauto/addmember', JSON.stringify(data), config)
            .then(function successCallback(response){
                $scope.response = response;
                $('#userModal').modal('hide').remove();
            }, function errorCallback(response){
            $('#failedUserMessage').removeClass('d-none');
        });
        setInterval(() => location.reload(), refreshWaitTime);
    };

    $scope.saveModule = function (repo_name, repo_link, module_name) {
        var data = JSON.stringify({
            reponame: repo_name,
            repolink: repo_link,
            moduleName: module_name
        });

        var config = {
            headers : {
                'Content-Type': 'application/json;charset=UTF-8;'
            }
        };

        $http.post('/aboutauto/savemodule', data, config)
            .then(function successCallback(response){
                $scope.response = response;
                $('#modulemodal').modal('hide').remove();
            }, function errorCallback(response){
                $('#failedModuleMessage').removeClass('d-none');
            });
        setInterval(() => location.reload(), refreshWaitTime);
    };

    $scope.saveRepo = function (repoNameId, repoLink) {
        var data = JSON.stringify({
            reponame: repoNameId,
            repoLink: repoLink
        });

        var config = {
            headers : {
                'Content-Type': 'application/json;charset=UTF-8;'
            }
        };

        $http.post('/aboutauto/addrepo', data, config)
            .then(function successCallback(response){
                $scope.response = response;
                $('#repoModal').modal('hide').remove();
            }, function errorCallback(response){
                $('#failedRepoMessage').removeClass('d-none');
            });
        setInterval(() => location.reload(), refreshWaitTime);
    };

    $scope.deleteUser = function (user_name) {
        var payload = JSON.stringify({
            member_email: JSON.parse(user_name).member_email
        });

        var config = {
            headers : {
                'Content-Type': 'application/json;charset=UTF-8;'
            },
            data: payload
        };

        $http.delete('/aboutauto/deletemember', config)
            .then(function successCallback(response){
                $scope.response = response;
                $('#deleteUserModal').modal('hide').remove();
            }, function errorCallback(response){

        });
        setInterval(() => location.reload(), refreshWaitTime);
    };

    $scope.saveSubmodule = function (module_name, submodule_name, repo_name) {
        var data = JSON.stringify({
            moduleName: module_name,
            subModuleName: submodule_name,
            repoName: repo_name
        });

        var config = {
            headers : {
                'Content-Type': 'application/json;charset=UTF-8;'
            }
        };

        $http.post('/aboutauto/savesubmodule', data, config)
            .then(function successCallback(response){
                $scope.response = response;
                $('#submodulemodal').modal('hide').remove();
        }, function errorCallback(response){
            $('#failedSubModuleMessage').removeClass('d-none');
        });
        setInterval(() => location.reload(), refreshWaitTime);
    };
});