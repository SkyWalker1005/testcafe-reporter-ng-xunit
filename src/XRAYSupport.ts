/* eslint-disable */
const fetch = require('node-fetch');
var GraphQLURI="http://xray.cloud.xpand-it.com/api/v1/graphql"
declare var temper
var test


 export class XRAYSupport{
   somedata ="sample"


     async  XRAYAuthenticationAPI(){

              const response=await  fetch('https://xray.cloud.xpand-it.com/api/v1/authenticate',{

                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({

                    "client_id": "7C26EB6401AE4C0FB4081DE3DB76413C",
                    "client_secret": "1ec6ce2d4dbca8149624f31641bca7541ceacb60a6294075521ba0f56bd38ba8"

                             })



                        })


                        globalThis.temper=response.json()

   return temper
            }





    async getTestPlansKeyAPI(ProjectName:string){
            const response=await fetch(GraphQLURI,{
                method: "Post",
                headers:{"Content-Type":"application/json",
                        "Authorization":"Bearer "+await this.XRAYAuthenticationAPI()+""},
                body:JSON.stringify({
                    query: `
                        query {
                        getTestPlans(jql: "project = '`+ProjectName+`'", start:0,limit:20) {
                            total

                                results {
                                    jira(fields: ["key","assignee", "reporter"])
                                    issueId
                                    tests(limit: 100)
                                                {


                                                total
                                                results{
                                                    issueId
                                                    testType{
                                                        name
                                                    }
                                                        jira(fields: ["key","assignee", "reporter"])
                                                        }

                                                }

                                        }

                                        }

                    }



                    `
                        })


                })
           return  response.json()

            }

            async getTestCasesKeysAPI(PlanId:string){

                const response=await  fetch(GraphQLURI,{
                                         method: "Post",
                                         headers:{"Content-Type":"application/json",
                                         "Authorization":"Bearer "+await this.XRAYAuthenticationAPI()+""},
                                         body:JSON.stringify({
                                             query: `
                                                 query {
                                                 getTestPlan(issueId:"`+PlanId+`") {

                                                     issueId
                                                     projectId
                                                     tests(limit: 100)
                                                                         {
                                                                         total
                                                                         results{
                                                                             issueId
                                                                             testType{
                                                                                 name
                                                                             }
                                                                                 jira(fields: ["key","assignee", "reporter","description"])
                                                                                 }

                                                                         }
                                                     jira(fields: ["assignee", "reporter","key","description"])

                                                 }
                                             }



                                             `
                                               })


                                       })
            return  response.json()
                // var data=await response.json()
                // this.somedata= data.data.getTestPlan.tests.results[1].jira.key


            }

            async createTestExecutionAPI(TestCasesissueID,ProjectName){

                const response= await fetch(GraphQLURI,{
                    method: "Post",
                    headers:{"Content-Type":"application/json",
                    "Authorization":"Bearer "+await this.XRAYAuthenticationAPI()+""},
                    body:JSON.stringify({
                        query: `
                        mutation	{
			createTestExecution(
				testIssueIds: [`+TestCasesissueID+`]

					jira: {
						fields:
							{
							summary: "Test Execution", project: {key: "`+ProjectName+`"}
							}
						  }
								)
			{
				testExecution
					{
						issueId
							jira(fields: ["key"])
							testRuns(limit: 100)
								{
								total
								limit
								start
								results{
									id
									status
										{
											name
											color
											description
										}
										gherkin
										examples
											{
											id
											status
												{
													name
													color
													description
												}
											}
										test
											{
											issueId
											}
										testExecution {
										issueId
													}
										}
							}
				}        warnings
						createdTestEnvironments
						}


        }
                        `
                            })


                    })
                    return response.json()


         //var ret =data.data.createTestExecution.testExecution.issueId


            }





            async  XRAYAuthenticationTESTAPI(){

                const response =await fetch('https://xray.cloud.xpand-it.com/api/v1/authenticate',{

                  method: "POST",
                  headers: {"Content-Type":"application/json"},
                  body: JSON.stringify({

                      "client_id": "7C26EB6401AE4C0FB4081DE3DB76413C",
                      "client_secret": "1ec6ce2d4dbca8149624f31641bca7541ceacb60a6294075521ba0f56bd38ba8"

                               })



                          })

                          return response.json()



              }





            async getTestRunsAPI(issueId){

                const response=await fetch(GraphQLURI,{
                                    method: "Post",
                                    headers:{"Content-Type":"application/json",
                                    "Authorization":"Bearer "+await this.XRAYAuthenticationAPI()+""},
                                    body:JSON.stringify({
                                        query: `
                                        {getTestRuns( testExecIssueIds: ["`+issueId+`"], start:0, limit: 100 )
                                        {
                                            total
                                            limit
                                            start
                                            results
                                                {
                                                    id
                                                    test
                                                        {
                                                            issueId
                                                                jira(fields: ["key"])
                                                        }
                                                }
                                        }
                                    }

                                        `
                                            })


                                    })
                    return response.json()



            }

            async updateTestRunsAPI(TestRunId, Status){

                const response=await fetch(GraphQLURI,{
                    method: "Post",
                    headers:{"Content-Type":"application/json",
                    "Authorization":"Bearer "+await this.XRAYAuthenticationAPI()+""},
                            body:JSON.stringify({
                        query: `
                        mutation
                        {
                        updateTestRunStatus( id: "`+TestRunId+`", status: "`+Status+`")
                        }


                        `
                            })


                    })
                    return response.json()



            }

            async addTestExecutionAPI(testPlanIssueid,TestExecutionIssueId){

                const response=await fetch(GraphQLURI,{
                    method: "Post",
                    headers:{"Content-Type":"application/json",
                    "Authorization":"Bearer "+await this.XRAYAuthenticationAPI()+""},
                               body:JSON.stringify({
                        query: `
                       mutation {
                            addTestExecutionsToTestPlan(issueId: "`+testPlanIssueid+`", testExecIssueIds: ["`+TestExecutionIssueId+`"])
                                {
                                    addedTestExecutions
                                    warning
                                }
                        }

                        `
                            })


                    })
                    return response.json()



            }






}






export default XRAYSupport
