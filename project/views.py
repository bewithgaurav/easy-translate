from django.shortcuts import render

# Create your views here.

def home(request):
	x=(request.get_host())
	x=x.split(':')
	x=x[0]
	print(x)
	return render(request, 'index.html', {'host':x})
