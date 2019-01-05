from util import entropy, information_gain, partition_classes
import numpy as np 
import ast
from scipy.stats import mode

class DecisionTree(object):
    def __init__(self):
        # Initializing the tree as an empty dictionary or list, as preferred
        #self.tree = []
        self.tree = {}
        

    def learn(self, X, y):
        # TODO: Train the decision tree (self.tree) using the the sample X and labels y
        # You will have to make use of the functions in utils.py to train the tree
        
        # One possible way of implementing the tree:
        #    Each node in self.tree could be in the form of a dictionary:
        #       https://docs.python.org/2/library/stdtypes.html#mapping-types-dict
        #    For example, a non-leaf node with two children can have a 'left' key and  a 
        #    'right' key. You can add more keys which might help in classification
        #    (eg. split attribute and split value)
        nrows = len(X)
        ncols = len(X[0])
        num_zero = len(y) - np.sum(y)
        num_ones = np.sum(y)

        ent = entropy(y)

        self.tree['entropy'] = ent
        self.tree['num_rows'] = nrows
        self.tree['num_one'] = np.sum(y)
        self.tree['num_zero'] = len(y)-np.sum(y)

        if ent < .1:
            self.tree['class'] = mode(y).mode[0]
            self.tree['split_attr'] = 'done'
            self.tree['split_val'] = 'done'
            return self

        info_gain_list = []
        split_val_list = []

        for idx in range(ncols):
            best_val = 0
            best_gain = 0
            col = [row[idx] for row in X] 
            
            if isinstance(col[0], str):
                val_set = set(col)
                for val in val_set: 
                    X_left, X_right, y_left, y_right = partition_classes(X,y,idx,val)
                    gain = information_gain(y,[y_left,y_right])
                    if gain > best_gain:
                        best_gain = gain
                        best_val = val
            else: 
                steps = np.linspace(start=np.min(col),stop=np.min(col),num=5, endpoint=False)[1:] 
                for val in steps: 
                    X_left, X_right, y_left, y_right = partition_classes(X,y,idx,val)
                    gain=information_gain(y,[y_left,y_right])
                    if gain > best_gain: 
                        best_gain = gain
                        best_val = val
                        
            info_gain_list.append(best_gain)
            split_val_list.append(best_val)
                
        best_split_col = np.argmax(info_gain_list) 
        best_split_value = split_val_list[best_split_col]  
     
        X_left, X_right, y_left, y_right = partition_classes(X,y,best_split_col,best_split_value)  

        self.tree['class']='parent' 
        self.tree['split_attr']=best_split_col
        self.tree['split_val']=best_split_value
        
        self.tree['left_child'] = DecisionTree()
        self.tree['left_child'].learn(X_left,y_left)
        
        self.tree['right_child'] = DecisionTree()
        self.tree['right_child'].learn(X_right,y_right) 
 


    def classify(self, record):
        # TODO: classify the record using self.tree and return the predicted label
        if self.tree['split_val']=='done':
            return self.tree['class']
        
        else: #at parent node 
            attr=self.tree['split_attr']
            val = self.tree['split_val']
            
            if isinstance(val, str): 
                if record[attr] == val:

                    return self.tree['left_child'].classify(record)
                else:
                    return self.tree['right_child'].classify(record)
                    
            else:
                if record[attr] <= val:
                    return self.tree['left_child'].classify(record)
                    
                else:
                    return self.tree['right_child'].classify(record)
        
