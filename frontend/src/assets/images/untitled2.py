# -*- coding: utf-8 -*-
"""Untitled2.ipynb

Automatically generated by Colab.

Original file is located at
    https://colab.research.google.com/drive/1sWwykSDU-82-4NE3hpQqhEhepO3xDBMA
"""

import pandas as pd
from sklearn.datasets import load_iris
import matplotlib.pyplot as plt
import seaborn as sns

#Load the Iris dataset into a Pandas DataFrame and display the
#first 5 rows.
iris = load_iris()
iris_df = pd.DataFrame(data=iris.data, columns=iris.feature_names)
print(iris_df.head())

#Shape of the dataset:
print(iris_df.shape)


#Show summary statistics (mean, min, max) for all columns
print("Shape of the dataset:", iris_df.shape)
print(iris_df.describe().loc[['mean', 'min', 'max']])
print(iris_df.dtypes)
print("Missing values:", iris_df.isnull().sum())
import numpy as np

sepal_length = iris_df['sepal length (cm)']
print("Mean of sepal length:", np.mean(sepal_length))
print("Median of sepal length:", np.median(sepal_length))
correlation = iris_df['sepal length (cm)'].corr(iris_df['petal length (cm)'])
print("Correlation between sepal length and petal length:", correlation)
# Adding species data to the DataFrame
iris_df['species'] = pd.Categorical.from_codes(iris.target, iris.target_names)
setosa_df = iris_df[iris_df['species'] == 'setosa']
print(setosa_df)
import matplotlib.pyplot as plt

plt.hist(iris_df['sepal length (cm)'], bins=10, color='blue')
plt.title('Histogram of Sepal Length')
plt.xlabel('Sepal Length (cm)')
plt.ylabel('Frequency')
plt.show()
plt.scatter(iris_df['sepal length (cm)'], iris_df['petal length (cm)'], color='red')
plt.title('Scatter Plot of Sepal Length vs. Petal Length')
plt.xlabel('Sepal Length (cm)')
plt.ylabel('Petal Length (cm)')
plt.show()
import seaborn as sns

sns.boxplot(x='species', y='petal width (cm)', data=iris_df)
plt.title('Box Plot of Petal Width by Species')
plt.show()
sns.pairplot(iris_df, hue='species')
plt.show()
iris_df.to_csv('iris_modified.csv', index=False)

import numpy as np
import pandas as pd

data = pd.read_csv("https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv")
print(data.head())

from sklearn. neighbors import KNeighborsClassifier
model = KNeighborsClassifier(n_neighbors=1)
model.fit(X_train, y_train)

predict =model(X_train)
predict[0:10]