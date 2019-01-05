package edu.gatech.cse6242;
import java.io.IOException;
import java.util.StringTokenizer;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.io.*;
import org.apache.hadoop.mapreduce.*;
import org.apache.hadoop.util.*;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;

public class Q4 {
    public static class NodeMapper
    extends Mapper<Object, Text, IntWritable, IntWritable>{
        
        private IntWritable OutNode = new IntWritable();
        private IntWritable InNode = new IntWritable();
        private IntWritable OutDegree = new IntWritable(1);
        private IntWritable InDegree = new IntWritable(-1);
        
        public void map(Object key, Text value, Context context
                        ) throws IOException, InterruptedException {
            OutNode.set(Integer.parseInt(value.toString().split("\\t")[0]));
            InNode.set(Integer.parseInt(value.toString().split("\\t")[1]));

            context.write(OutNode, OutDegree);
            context.write(InNode, InDegree);
       
        }
    }

  public static class NodeReducer
       extends Reducer<IntWritable,IntWritable,IntWritable,IntWritable> {
    private IntWritable result = new IntWritable();
    public void reduce(IntWritable key, Iterable<IntWritable> values,
                       Context context
                       ) throws IOException, InterruptedException {
      int sum = 0;
      for (IntWritable val : values) {
        sum += val.get();
    }
      
      result.set(sum);
      context.write(key, result);
    }
  }
   
  public static class DeltaMapper
    extends Mapper<Object, Text, IntWritable, IntWritable>{
        
        private IntWritable Delta = new IntWritable();
        private IntWritable One = new IntWritable(1);
        
        public void map(Object key, Text value, Context context
                        ) throws IOException, InterruptedException {
            Delta.set(Integer.parseInt(value.toString().split("\\t")[1]));
            context.write(Delta, One);       
        }
    }

  public static class DeltaReducer
       extends Reducer<IntWritable,IntWritable,IntWritable,IntWritable> {
    private IntWritable result = new IntWritable();
    public void reduce(IntWritable key, Iterable<IntWritable> values,
                       Context context
                       ) throws IOException, InterruptedException {
      int sum = 0;
      for (IntWritable val : values) {
        sum += val.get();
    }
      result.set(sum);
      context.write(key, result);
    }
  }

    public static void main(String[] args) throws Exception {
        Configuration conf = new Configuration();
        Job job_degree = Job.getInstance(conf, "job_degree");
        job_degree.setJarByClass(Q4.class);
        job_degree.setMapperClass(NodeMapper.class);
        job_degree.setCombinerClass(NodeReducer.class);
        job_degree.setReducerClass(NodeReducer.class);
        job_degree.setOutputKeyClass(IntWritable.class);
        job_degree.setOutputValueClass(IntWritable.class);

        FileInputFormat.addInputPath(job_degree, new Path(args[0]));
        FileOutputFormat.setOutputPath(job_degree, new Path("intermediate_output"));
        job_degree.waitForCompletion(true);
        
        Job job_delta = Job.getInstance(conf, "job_delta");
        job_delta.setJarByClass(Q4.class);
        job_delta.setMapperClass(DeltaMapper.class);
        job_delta.setCombinerClass(DeltaReducer.class);
        job_delta.setReducerClass(DeltaReducer.class);
        job_delta.setOutputKeyClass(IntWritable.class);
        job_delta.setOutputValueClass(IntWritable.class);
        
        FileInputFormat.addInputPath(job_delta, new Path("intermediate_output"));
        FileOutputFormat.setOutputPath(job_delta, new Path(args[1]));
        System.exit(job_delta.waitForCompletion(true) ? 0 : 1);
    }
}
