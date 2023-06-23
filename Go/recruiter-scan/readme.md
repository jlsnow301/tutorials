## Experience Scanner
Scans over a collection of emails I downloaded from my gmail.

The emails are specifically filtered using keyword detection of words like "recruiter" "staffing" "developer".
The actual chance of these being non-recruiting is particularly slim. Probably 5 max.

This looks at message contents for words like "5 year", "3+ year, and ranges "2-4 year" using regex.
The higher number is always taken if there are more than 1 experience listing.
It also scans for implications like "senior developer" "junior programmer" "entry level" and three word combos of senior, junior.

### Opinions
Generally no listing returns 0 but this should be taken with a grain of salt. Omission isn't exactly "no exp required".
Recruiters are more likely to round up and be lenient on job postings, therefore it is more likely actual 0's are ones.

I also assumed entry level was one, junior was 3, and senior/lead was 5.

Results:
![histogram](https://user-images.githubusercontent.com/42397676/153697018-13307173-11ad-4ec3-8c13-d93a3d69ca81.png)

On Tableau:
https://public.tableau.com/app/profile/jeremiah.snow/viz/Recruiter-Emails/Sheet1



