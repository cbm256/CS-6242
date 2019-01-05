// Databricks notebook source
// MAGIC %md
// MAGIC #### Q2 - Skeleton Scala Notebook
// MAGIC This template Scala Notebook is provided to provide a basic setup for reading in / writing out the graph file and help you get started with Scala.  Clicking 'Run All' above will execute all commands in the notebook and output a file 'toygraph.csv'.  See assignment instructions on how to to retrieve this file. You may modify the notebook below the 'Cmd2' block as necessary.
// MAGIC 
// MAGIC #### Precedence of Instruction
// MAGIC The examples provided herein are intended to be more didactic in nature to get you up to speed w/ Scala.  However, should the HW assignment instructions diverge from the content in this notebook, by incident of revision or otherwise, the HW assignment instructions shall always take precedence.  Do not rely solely on the instructions within this notebook as the final authority of the requisite deliverables prior to submitting this assignment.  Usage of this notebook implicitly guarantees that you understand the risks of using this template code. 

// COMMAND ----------

/*
DO NOT MODIFY THIS BLOCK
This assignment can be completely accomplished with the following includes and case class.
Do not modify the %language prefixes, only use Scala code within this notebook.  The auto-grader will check for instances of <%some-other-lang>, e.g., %python
*/
import org.apache.spark.sql.functions.desc
import org.apache.spark.sql.functions._
case class edges(Source: String, Target: String, Weight: Int)
import spark.implicits._

// COMMAND ----------

/* 
Create an RDD of graph objects from our toygraph.csv file, convert it to a Dataframe
Replace the 'toygraph.csv' below with the name of Q2 graph file.
*/
val df = spark.read.textFile("/FileStore/tables/bitcoinalpha.csv") 
  .map(_.split(","))
  .map(columns => edges(columns(0), columns(1), columns(2).toInt)).toDF()

// COMMAND ----------

// determine total number of rows 
df.count()

// COMMAND ----------

// Insert blocks as needed to further process your graph, the division and number of code blocks is at your discretion.

// COMMAND ----------

// e.g. eliminate duplicate rows
val df_unique = df.dropDuplicates()
df_unique.count()

// COMMAND ----------

// e.g. filter nodes by edge weight >= supplied threshold in assignment instructions
// filter command is used
val df_filter = df_unique.filter("Weight >= 5")
df_filter.show(5)

// COMMAND ----------

// MAGIC %md
// MAGIC ## The highest outdegree node is 129 with an outdegree of 48 based on code block below

// COMMAND ----------

// find node with highest in-degree, if two or more nodes have the same in-degree, report the one with the lowest node id
// find node with highest out-degree, if two or more nodes have the same out-degree, report the one with the lowest node id
// find node with highest total degree, if two or more nodes have the same total degree, report the one with the lowest node id
//the top 5 out_degree nodes are shown below. 
val highest_out_degree = df_filter.groupBy("Source").agg(count("Weight")).orderBy(desc("count(Weight)")).withColumnRenamed("count(Weight)","out_degree").withColumnRenamed("Source","Node1");
val n_out = highest_out_degree.select("Node1").head().get(0)
val v_out = highest_out_degree.select("out_degree").head().get(0)

highest_out_degree.show(5)

// COMMAND ----------

// MAGIC %md
// MAGIC ## The highest indegree node is 2 with an indegree of 65  based on code block below

// COMMAND ----------

val highest_in_degree = df_filter.groupBy("Target").agg(count("Weight")).orderBy(desc("count(Weight)")).withColumnRenamed("count(Weight)","in_degree").withColumnRenamed("Target","Node2");

val n_in = highest_in_degree.select("Node2").head().get(0)
val v_in = highest_in_degree.select("in_degree").head().get(0)

highest_in_degree.show(5)

// COMMAND ----------

// MAGIC %md
// MAGIC ## The highest total degree node is 2 with an degree of 99  based on code block below

// COMMAND ----------

val highest_total_degree =highest_in_degree.join(highest_out_degree,$"Node1" === $"Node2").withColumn("total_degree",expr("in_degree+out_degree")).orderBy(desc("total_degree"))                 

val n_total = highest_total_degree.select("Node1").head().get(0)
val v_total = highest_total_degree.select("total_degree").head().get(0)

highest_total_degree.show(5)

// COMMAND ----------

// MAGIC %md
// MAGIC ## The final dataframe can be built below

// COMMAND ----------

/*
Create a dataframe to store your results
Schema: 3 columns, named: 'v', 'd', 'c' where:
'v' : vertex id
'd' : degree calculation (an integer value.  one row with highest in-degree, a row w/ highest out-degree, a row w/ highest total degree )
'c' : category of degree, containing one of three string values:
                                                'i' : in-degree
                                                'o' : out-degree                                                
                                                't' : total-degree
- Your output should contain exactly three rows.  
- Your output should contain exactly the column order specified.
- The order of rows does not matter.
                                                
A correct output would be:

v    d    c
1    3    i
2    3    o
2    6    t

whereas:
- Node 1 has highest in-degree with a value of 3
- Node 2 has highest out-degree with a value of 3
- Node 2 has highest total degree with a value of 6
*/
val finalList = Seq(
  (n_in.toString(), v_in.toString(),"i"),
   (n_out.toString(), v_out.toString(),"o"),
   (n_total.toString(), v_total.toString(),"t")
)
val finalDF = finalList.toDF("v", "d","c")

display(finalDF)

// COMMAND ----------

// MAGIC %md
// MAGIC ## The results are seen in the dataframe above. It can easily be exported to a csv using the display function
