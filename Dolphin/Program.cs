using Dolphin.Helper;
using Dolphin.BLL.Repository;
using Dolphin.Common.Interface;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDIServices(builder.Configuration);
builder.Services.AddScoped<ITaskRepository, TaskRespository>();

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
